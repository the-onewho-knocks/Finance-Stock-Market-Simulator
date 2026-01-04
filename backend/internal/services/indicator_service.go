package services

import (
	"context"
	"errors"
	"fmt"

	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/cache"
	"github.com/the-onewho-knocks/finance-Simulation/backend/internal/stockapi"
)

type IndicatorService struct {
	api   stockapi.IndicatorClient
	cache *cache.IndicatorCache
}

func NewIndicatorService(
	api stockapi.IndicatorClient,
	cache *cache.IndicatorCache,
) *IndicatorService {
	return &IndicatorService{
		api:   api,
		cache: cache,
	}
}

// ================= SMA =================

func (s *IndicatorService) GetSMA(
	ctx context.Context,
	symbol string,
	interval string,
	timePeriod int,
	limit int,
) ([]stockapi.SMAPoint, error) {

	cacheKey := fmt.Sprintf(
		"sma:%s:%s:%d:%d",
		symbol, interval, timePeriod, limit,
	)

	var cached []stockapi.SMAPoint
	if ok, _ := s.cache.Get(ctx, cacheKey, &cached); ok {
		return cached, nil
	}

	resp, err := s.api.GetSMA(
		symbol,
		interval,
		"close",
		timePeriod,
		limit,
	)
	if err != nil {
		return nil, err
	}

	if len(resp.Body) == 0 {
		return nil, errors.New("no SMA data returned")
	}

	_ = s.cache.Set(ctx, cacheKey, resp.Body)
	return resp.Body, nil
}

// ================= RSI =================

func (s *IndicatorService) GetRSI(
	ctx context.Context,
	symbol string,
	interval string,
	timePeriod int,
	limit int,
) ([]stockapi.RSIPoint, error) {

	cacheKey := fmt.Sprintf(
		"rsi:%s:%s:%d:%d",
		symbol, interval, timePeriod, limit,
	)

	var cached []stockapi.RSIPoint
	if ok, _ := s.cache.Get(ctx, cacheKey, &cached); ok {
		return cached, nil
	}

	resp, err := s.api.GetRSI(
		symbol,
		interval,
		"close",
		timePeriod,
		limit,
	)
	if err != nil {
		return nil, err
	}

	if len(resp.Body) == 0 {
		return nil, errors.New("no RSI data returned")
	}

	_ = s.cache.Set(ctx, cacheKey, resp.Body)
	return resp.Body, nil
}

// func (s *IndicatorService) GetSMAAndRSI(
// 	ctx context.Context,
// 	symbol string,
// 	interval string,
// 	timePeriod int,
// 	limit int,
// ) (stockapi.SMAPoint, stockapi.RSIPoint, error) {

// 	var (
// 		sma stockapi.SMAPoint
// 		rsi stockapi.RSIPoint
// 	)

// 	errCh := make(chan error, 2)
// 	wg := sync.WaitGroup{}
// 	wg.Add(2)

// 	go func() {
// 		defer wg.Done()
// 		var err error
// 		sma, err = s.api.GetSMA(ctx, symbol, interval, timePeriod, limit)
// 		if err != nil {
// 			errCh <- err
// 		}
// 	}()

// 	go func() {
// 		defer wg.Done()
// 		var err error
// 		rsi, err = s.api.GetRSI(ctx, symbol, interval, timePeriod, limit)
// 		if err != nil {
// 			errCh <- err
// 		}
// 	}()

// 	wg.Wait()
// 	close(errCh)

// 	if err := <-errCh; err != nil {
// 		return nil, nil, err
// 	}

// 	return sma, rsi, nil
// }
