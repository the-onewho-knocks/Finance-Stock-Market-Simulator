package stockapi

import (
	"fmt"
	"net/url"
	"strconv"
	"strings"
)

type rawHistroyResponse struct {
	Datasets []struct {
		Metric string  `json:"metric"`
		Values [][]any `json:"Values"`
	} `json:"datasets"`
}

type RawHistoricalStatsResponse map[string]map[string]any

type HistoricalStats map[string]map[string]float64

func (c *RapidApiClient) GetHistoricalPrices(
	stock string,
	period string,
) ([]HistoricalPrice, error) {

	var raw rawHistroyResponse

	path := fmt.Sprintf(
		"/historical_data?stock_name=%s&period=%s&filter=price",
		url.QueryEscape(stock),
		url.QueryEscape(period),
	)

	if err := c.doRequest(path, &raw); err != nil {
		return nil, err
	}

	var prices []HistoricalPrice

	for _, dataset := range raw.Datasets {
		if dataset.Metric != "Price" {
			continue
		}

		for _, row := range dataset.Values {
			if len(row) < 2 {
				continue
			}

			date, ok := row[0].(string)
			if !ok {
				continue
			}

			priceStr, ok := row[1].(string)
			if !ok {
				continue
			}

			price, err := strconv.ParseFloat(priceStr, 64)
			if err != nil {
				continue
			}

			prices = append(prices, HistoricalPrice{
				Date:  date,
				Close: price,
			})
		}
	}

	if prices == nil {
		prices = []HistoricalPrice{}
	}

	return prices, nil
}

func (c *RapidApiClient) GetHistoricalStats(
	stock string,
	stats string,
) (HistoricalStats, error) {

	var raw RawHistoricalStatsResponse

	path := fmt.Sprintf(
		"/historical_stats?stock_name=%s&stats=%s",
		url.QueryEscape(stock),
		url.QueryEscape(stats),
	)

	if err := c.doRequest(path, &raw); err != nil {
		return nil, err
	}

	result := make(HistoricalStats)

	for metric, periods := range raw {
		key := normalizeKey(metric)
		result[key] = make(map[string]float64)

		for period, value := range periods {
			var val float64

			switch v := value.(type) {

			case float64:
				// JSON number → already float64
				val = v

			case string:
				// Handle "64,259" style strings
				v = strings.ReplaceAll(v, ",", "")
				parsed, err := strconv.ParseFloat(v, 64)
				if err != nil {
					continue
				}
				val = parsed

			default:
				continue
			}

			result[key][period] = val
		}
	}

	return result, nil
}

func normalizeKey(s string) string {
	s = strings.ToLower(s)
	s = strings.TrimSpace(s)
	s = strings.ReplaceAll(s, " ", "_")
	s = strings.ReplaceAll(s, "%", "percent")
	return s
}
