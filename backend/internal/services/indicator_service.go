package services

// import (
// 	"context"
// 	"errors"
// 	"sync"
// 	"time"

// 	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
// )

// type IndicatorService struct {
// 	api stockapi.Client
// }

// func NewIndiacatorService(api stockapi.Client) *IndicatorService {
// 	return &IndicatorService{api: api}
// }

// // sma simple moving average
// func (s *IndicatorService) GetSMA(
// 	ctx context.Context, symbol string,
// 	period int, start, end time.Time,
// 	interval string,
// ) ([]float64, error) {
// 	prices, err := s.fetchClosePrices(symbol, start, end, interval)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return calculateRSI(prices, period), nil
// }

// // RSI relative strength index
// func (s *IndicatorService) GetRSI(
// 	ctx context.Context,
// 	symbol string,
// 	period int,
// 	start, end time.Time,
// 	interval string,
// ) ([]float64, error) {
// 	prices, err := s.fetchClosePrices(symbol, start, end, interval)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return calculateRSI(prices, period), nil
// }

// // fetchClosePrices fetches hirstorical prices using goroutines
// func (s *IndicatorService) fetchClosePrices(
// 	symbol string,
// 	start, end time.Time,
// 	interval string,
// ) ([]float64, error) {
// 	history, err := s.api.GetHistoricalPrices(symbol, start, end, interval)
// 	if err != nil {
// 		return nil, err
// 	}
// 	if len(history) == 0 {
// 		return nil, errors.New("no historical data available")
// 	}

// 	prices := make([]float64, len(history))
// 	wg := sync.WaitGroup{}
// 	for i, h := range history {
// 		wg.Add(1)
// 		go func(i int, price float64) {
// 			defer wg.Done()
// 			prices[i] = price
// 		}(i, h.Price)
// 	}
// 	wg.Wait()
// 	return prices, nil
// }

// func calculateSMA(prices []float64, period int) []float64 {
// 	if period <= 0 || len(prices) < period {
// 		return []float64{}
// 	}

// 	out := make([]float64, 0, len(prices)-period+1)

// 	for i := period - 1; i < len(prices); i++ {
// 		sum := 0.0
// 		for j := i - period + 1; j <= i; j++ {
// 			sum += prices[j]
// 		}
// 		out = append(out, sum/float64(period))
// 	}
// 	return out
// }

// func calculateRSI(prices []float64, period int) []float64 {
// 	if len(prices) <= period {
// 		return []float64{}
// 	}

// 	gains, losses := 0.0, 0.0
// 	for i := 1; i <= period; i++ {
// 		diff := prices[i] - prices[i-1]
// 		if diff >= 0 {
// 			gains += diff
// 		} else {
// 			losses -= diff
// 		}
// 	}

// 	if losses == 0 {
// 		return []float64{100}
// 	}

// 	rs := gains / losses
// 	rsi := 100 - (100 / (1 + rs))
// 	return []float64{rsi}
// }
