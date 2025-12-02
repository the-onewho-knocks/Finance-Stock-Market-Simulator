package stockapi

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type NewsClient struct {
	httpClient *http.Client
}

func NewNewsClient() *NewsClient {
	return &NewsClient{
		httpClient: &http.Client{
			Timeout: 6 * time.Second,
		},
	}
}

type NewsItem struct {
	Title       string    `json:"title"`
	Publisher   string    `json:"publisher"`
	Link        string    `json:"link"`
	PublishedAt time.Time `json:"published_at"`
	Summary     string    `json:"summary"`
	Tickers     []string  `json:"tickers"`
}

// Yahoo Finance News Response Schema
type yahooNewsResponse struct {
	Items []struct {
		Title     string `json:"title"`
		Publisher string `json:"publisher"`
		Link      string `json:"link"`
		Provider  string `json:"provider"`
		Published string `json:"pubDate"`
		Type      string `json:"type"`
		Summary   string `json:"summary"`
		Tickers   []struct {
			Symbol string `json:"symbol"`
		} `json:"tickers"`
	} `json:"items"`
}

func (n *NewsClient) GetMarketNews() ([]NewsItem, error) {
	url := "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news"
	// OR: https://query1.finance.yahoo.com/v1/finance/trending/india

	resp, err := n.httpClient.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var data yahooNewsResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, err
	}

	news := []NewsItem{}
	for _, item := range data.Items {
		pubTime, _ := time.Parse(time.RFC1123Z, item.Published)
		tickers := []string{}
		for _, t := range item.Tickers {
			tickers = append(tickers, t.Symbol)
		}
		news = append(news, NewsItem{
			Title:       item.Title,
			Publisher:   item.Publisher,
			Link:        item.Link,
			Summary:     item.Summary,
			Tickers:     tickers,
			PublishedAt: pubTime,
		})
	}
	return news, nil
}

// fetch the news for a specific topic
func (n *NewsClient) GetSymbolNews(symbol string) ([]NewsItem, error) {
	url := fmt.Sprintf("https://query1.finance.yahoo.com/v1/finance/search?q=%s", symbol)
	resp, err := n.httpClient.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	news := []NewsItem{}
	if newsArr, ok := raw["news"].([]interface{}); ok {
		for _, nitem := range newsArr {
			entry := nitem.(map[string]interface{})

			title := fmt.Sprintf("%v", entry["title"])
			publisher := fmt.Sprintf("%v", entry["publisher"])
			link := fmt.Sprintf("%v", entry["link"])
			summary := fmt.Sprintf("%v", entry["summary"])

			pubAt := time.Now()
			if ts, ok := entry["providerPublishTime"].(float64); ok {
				pubAt = time.Unix(int64(ts), 0).UTC()
			}

			news = append(news, NewsItem{
				Title:       title,
				Publisher:   publisher,
				Link:        link,
				Summary:     summary,
				Tickers:     []string{symbol},
				PublishedAt: pubAt,
			})
		}
	}
	return news, nil
}
