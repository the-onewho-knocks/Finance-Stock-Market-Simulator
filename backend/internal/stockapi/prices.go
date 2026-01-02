package stockapi

import (
	"fmt"
	"net/url"
	"strings"
)

func (c *RapidApiClient) GetPrice(symbol string) (*PriceData, error) {
	var resp struct {
		Data PriceData `json:"data"`
	}

	// Use QueryEscape to handle special characters in symbols
	path := fmt.Sprintf("/price?symbol=%s", url.QueryEscape(symbol))

	err := c.doRequest(path, &resp)
	if err != nil {
		return nil, err
	}
	return &resp.Data, nil
}

func (c *RapidApiClient) GetPrices(symbols []string) ([]PriceData, error) {
	if len(symbols) == 0 {
		return nil, nil // Return early if slice is empty
	}

	var resp struct {
		Data []PriceData `json:"data"`
	}

	// Use strings.Join for cleaner, faster string concatenation
	query := url.QueryEscape(strings.Join(symbols, ","))
	path := fmt.Sprintf("/prices?symbols=%s", query)

	err := c.doRequest(path, &resp)
	if err != nil {
		return nil, err // Return nil for data if error occurs
	}

	return resp.Data, nil
}

func (c *RapidApiClient) PriceStream(symbols []string) (<-chan PriceData, error) {
	ch := make(chan PriceData)

	go func() {
		defer close(ch)

		for {
			prices, err := c.GetPrices(symbols)
			if err != nil {
				continue
			}

			for _, p := range prices {
				ch <- p
			}
		}
	}()

	return ch, nil
}
