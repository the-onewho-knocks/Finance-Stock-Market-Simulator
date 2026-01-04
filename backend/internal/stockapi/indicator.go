package stockapi

import (
	"fmt"
	"net/url"
)

//sma

type SMAResponse struct {
	ProcessedTime string     `json:"processedTime"`
	Symbol        string     `json:"symbol"`
	Interval      string     `json:"interval"`
	SeriesType    string     `json:"series_type"`
	Indicator     string     `json:"indicator"`
	TimePeriod    string     `json:"time_period"`
	Version       string     `json:"version"`
	Status        int        `json:"status"`
	Copywrite     string     `json:"copywrite"`
	Body          []SMAPoint `json:"body"`
}

type SMAPoint struct {
	Timestamp int64   `json:"timestamp"`
	SMA       float64 `json:"SMA"`
}

// rsi
type RSIResponse struct {
	ProcessedTime string     `json:"processedTime"`
	Symbol        string     `json:"symbol"`
	Interval      string     `json:"interval"`
	SeriesType    string     `json:"series_type"`
	Indicator     string     `json:"indicator"`
	TimePeriod    string     `json:"time_period"`
	Version       string     `json:"version"`
	Status        int        `json:"status"`
	Copywrite     string     `json:"copywrite"`
	Body          []RSIPoint `json:"body"`
}

type RSIPoint struct {
	Timestamp int64   `json:"timestamp"`
	RSI       float64 `json:"RSI"`
}

func (c *RapidApiClient) GetSMA(
	symbol string,
	interval string,
	seriesType string,
	timePeriod int,
	limit int,
) (*SMAResponse, error) {

	path := fmt.Sprintf(
		"/api/v1/markets/indicators/sma?symbol=%s&interval=%s&series_type=%s&time_period=%d&limit=%d",
		url.QueryEscape(symbol),
		url.QueryEscape(interval),
		url.QueryEscape(seriesType),
		timePeriod,
		limit,
	)

	var resp SMAResponse
	if err := c.doRequest(path, &resp); err != nil {
		return nil, err
	}

	return &resp, nil
}

// -------- RSI --------

func (c *RapidApiClient) GetRSI(
	symbol string,
	interval string,
	seriesType string,
	timePeriod int,
	limit int,
) (*RSIResponse, error) {

	path := fmt.Sprintf(
		"/api/v1/markets/indicators/rsi?symbol=%s&interval=%s&series_type=%s&time_period=%d&limit=%d",
		url.QueryEscape(symbol),
		url.QueryEscape(interval),
		url.QueryEscape(seriesType),
		timePeriod,
		limit,
	)

	var resp RSIResponse
	if err := c.doRequest(path, &resp); err != nil {
		return nil, err
	}

	return &resp, nil
}
