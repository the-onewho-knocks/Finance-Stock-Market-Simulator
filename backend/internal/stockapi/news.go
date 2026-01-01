package stockapi

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"time"
)

type YahooNewsResponse struct {
	Data []struct {
		Title     string `json:"title"`
		Link      string `json:"link"`
		Publisher string `json:"publisher"`
		Summary   string `json:"summary"`
		Date      string `json:"pubDate"`
		Tickers   []struct {
			Symbol string `json:"symbol"`
		} `json:"tickers"`
	} `json:"data"`
}

func (y *YahooClient) GetMarketNews() ([]NewsItem, error) {
	url := fmt.Sprintf("https://%s/api/yahoo/ne/news", y.apiHost)

	resp, err := y.doRequest(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("market news api returned non-200 status")
	}

	var res YahooNewsResponse
	if err := json.NewDecoder(resp.Body).Decode(&res); err != nil {
		return nil, err
	}

	return mapNews(res), nil
}

func (y *YahooClient) GetSymbolNews(symbol string) ([]NewsItem, error) {
	url := fmt.Sprintf("https://%s/api/yahoo/ne/news/%s", y.apiHost, symbol)

	resp, err := y.doRequest(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("symbol news api returned non-200 status")
	}

	var res YahooNewsResponse
	if err := json.NewDecoder(resp.Body).Decode(&res); err != nil {
		return nil, err
	}

	return mapNews(res), nil
}

func mapNews(res YahooNewsResponse) []NewsItem {
	items := make([]NewsItem, 0, len(res.Data))

	for _, n := range res.Data {
		tickers := make([]string, 0, len(n.Tickers))
		for _, t := range n.Tickers {
			tickers = append(tickers, t.Symbol)
		}

		pub := parseYahooDate(n.Date)

		items = append(items, NewsItem{
			Title:       n.Title,
			Publisher:   n.Publisher,
			Link:        n.Link,
			Summary:     n.Summary,
			PublishedAt: pub,
			Tickers:     tickers,
		})
	}

	return items
}

func parseYahooDate(raw string) time.Time {
	if raw == "" {
		return time.Time{}
	}

	// Try common Yahoo formats
	layouts := []string{
		time.RFC1123,
		time.RFC1123Z,
		time.RFC3339,
	}

	for _, layout := range layouts {
		if t, err := time.Parse(layout, raw); err == nil {
			return t
		}
	}

	return time.Time{}
}
