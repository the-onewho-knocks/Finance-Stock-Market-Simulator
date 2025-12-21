package stockapi

import (
	"encoding/json"
	"fmt"
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
	url := fmt.Sprintf("http://%s/api/yahoo/ne/news", y.apiHost)
	resp, err := y.doRequest(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var res YahooNewsResponse
	if err := json.NewDecoder(resp.Body).Decode(&res); err != nil {
		return nil, err
	}
	return mapNews(res), nil
}

func (y *YahooClient) GetSymbolNews(symbol string) ([]NewsItem, error) {
	url := fmt.Sprintf("http://%s/api/yahoo/ne/news/%s", y.apiHost, symbol)
	resp, err := y.doRequest(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	var res YahooNewsResponse
	if err := json.NewDecoder(resp.Body).Decode(&res); err != nil {
		return nil, err
	}
	return mapNews(res), nil
}

func mapNews(res YahooNewsResponse) []NewsItem {
	// Pre-allocate slice capacity to improve performance
	items := make([]NewsItem, 0, len(res.Data))

	for _, n := range res.Data {
		tickers := make([]string, 0, len(n.Tickers))
		for _, t := range n.Tickers {
			tickers = append(tickers, t.Symbol)
		}

		// Parse the date. If it fails, pub will be the zero value of time.Time.
		// You might want to log this error if it fails frequently.
		pub, err := time.Parse(time.RFC1123Z, n.Date)
		if err != nil {
			// Fallback: log error or use time.Now() if appropriate
		}

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
