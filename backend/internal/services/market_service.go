package services

// import (
// 	"log"
// 	"time"

// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
// )

// type MarketService struct {
// 	api        stockapi.Client
// 	stockCache *cache.StockCache
// }

// // constructor
// func NewMarketService(api stockapi.Client, stockCache *cache.StockCache) *MarketService {
// 	return &MarketService{
// 		api:        api,
// 		stockCache: stockCache,
// 	}
// }

// // get a sigle stock price(uses redis and fallback api)
// func (s *MarketService) GetPrice(symbol string) (*stockapi.PriceData, error) {

// 	//we are using redis functions that is stock cache functions here
// 	// like getchange , getprice , setstockdata etc

// 	price, err := s.stockCache.GetPrice(symbol)
// 	if err == nil && price > 0 {
// 		change, _ := s.stockCache.GetChange(symbol)
// 		return &stockapi.PriceData{
// 			Symbol: symbol,
// 			Price:  price,
// 			Change: change,
// 		}, nil
// 	}

// 	data, err := s.api.GetPrice(symbol)
// 	if err != nil {
// 		return nil, err
// 	}

// 	if err := s.stockCache.SetStockData(data.Symbol, data.Price, data.Change); err != nil {
// 		return nil, err
// 	}
// 	return data, nil

// }

// func (s *MarketService) GetPrices(symbols []string) ([]stockapi.PriceData, error) {
// 	//will find the prices data in result and if prices are not available for that
// 	// symbol then it will show in missing

// 	result := make([]stockapi.PriceData, 0, len(symbols))
// 	missing := make([]string, 0)

// 	for _, sym := range symbols {
// 		price, err := s.stockCache.GetPrice(sym)
// 		if err == nil && price > 0 {
// 			change, _ := s.stockCache.GetChange(sym)
// 			result = append(result, stockapi.PriceData{
// 				Symbol: sym,
// 				Price:  price,
// 				Change: change,
// 			})
// 		} else {
// 			missing = append(missing, sym)
// 		}
// 	}

// 	//what is happening here is when there are missing symbols
// 	// we try to get there prices and save it in apiData variable
// 	// and after finding there prices we append it into the result
// 	// so yeahh

// 	if len(missing) > 0 {
// 		apiData, err := s.api.GetPrices(missing)
// 		if err != nil {
// 			return nil, err
// 		}

// 		for _, d := range apiData {
// 			if err := s.stockCache.SetStockData(d.Symbol, d.Price, d.Change); err != nil {
// 				return nil, err
// 			}
// 			result = append(result, d)
// 		}
// 	}
// 	return result, nil
// }

// // this function right here fetches the prices continuously from the api
// // and upadates redis this is the markets heartbeat

// func (s *MarketService) StartPriceStream(symbols []string) (<-chan stockapi.PriceData, error) {
// 	out := make(chan stockapi.PriceData)

// 	stream, err := s.api.PriceStream(symbols)
// 	if err != nil {
// 		return nil, err
// 	}

// 	//this will continuously execute in the background
// 	go func() {
// 		for data := range stream {
// 			_ = s.stockCache.SetStockData(
// 				data.Symbol,
// 				data.Price,
// 				data.Change,
// 			)

// 			//forwards downstream (heatmaps , dashboard , ws)
// 			out <- data
// 		}
// 	}()

// 	return out, nil
// }

// //periodic puller it is now
// // useful when streaming is disablesed

// func (s *MarketService) RunAutoUpdater(
// 	symbols []string,
// 	interval time.Duration,
// ) {
// 	go func() {
// 		ticker := time.NewTimer(interval)
// 		defer ticker.Stop()

// 		for range ticker.C {
// 			data, err := s.api.GetPrices(symbols)
// 			if err != nil {
// 				log.Println("market updater error: ", err)
// 				continue
// 			}

// 			for _, d := range data {
// 				_ = s.stockCache.SetStockData(
// 					d.Symbol,
// 					d.Price,
// 					d.Change,
// 				)
// 			}
// 		}
// 	}()
// }
