package stockapi

import (
	"encoding/json"
	"fmt"
	"time"
)

/*
Yahoo chart API response (minimal fields needed)
*/
type yahooChartResponse struct {
	Chart struct {
		Result []struct {
			Timestamp  []int64 `json:"timestamp"`
			Indicators struct {
				Quote []struct {
					Close []float64 `json:"close"`
				} `json:"quote"`
			} `json:"indicators"`
		} `json:"result"`
	} `json:"chart"`
}

// GetHistoricalPrices fetches historical price data for a symbol
func (y *YahooClient) GetHistoricalPrices(symbol string, start, end time.Time, interval string) ([]PriceData, error) {

	// Validate interval (basic safety)
	validIntervals := map[string]bool{
		"1d":  true,
		"1wk": true,
		"1mo": true,
	}
	if !validIntervals[interval] {
		return nil, fmt.Errorf("invalid interval: %s", interval)
	}

	url := fmt.Sprintf(
		"https://%s/api/yahoo/hi/history/%s/%d/%d?interval=%s",
		y.apiHost,
		symbol,
		start.Unix(),
		end.Unix(),
		interval,
	)

	resp, err := y.doRequest(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var res yahooChartResponse
	if err := json.NewDecoder(resp.Body).Decode(&res); err != nil {
		return nil, err
	}

	// Defensive checks
	if len(res.Chart.Result) == 0 {
		return nil, fmt.Errorf("no historical data returned for %s", symbol)
	}

	result := res.Chart.Result[0]

	if len(result.Indicators.Quote) == 0 {
		return nil, fmt.Errorf("no quote data available for %s", symbol)
	}

	closes := result.Indicators.Quote[0].Close
	timestamps := result.Timestamp

	out := make([]PriceData, 0, len(timestamps))

	for i := 0; i < len(timestamps) && i < len(closes); i++ {
		price := closes[i]
		if price == 0 {
			continue // skip invalid price points
		}

		out = append(out, PriceData{
			Symbol:    symbol,
			Price:     price,
			Timestamp: time.Unix(timestamps[i], 0),
		})
	}

	return out, nil
}
