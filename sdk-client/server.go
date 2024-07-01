package main

import (
	"log"
	"net/http"

	sdk "agones.dev/agones/sdks/go"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// インスタンスを作成
	e := echo.New()
	// global
	var sdk_instance *sdk.SDK

	log.Print("Creating SDK instance")
	sdk_instance, err := sdk.NewSDK()
	if err != nil {
		print("SDK not Connect")
	}

	// ミドルウェアを設定
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// ルートを設定
	e.GET("/health", func(c echo.Context) error {
		sdk_instance.Health()
		return c.String(http.StatusOK, "Health")
	})
	e.GET("/ready", func(c echo.Context) error {
		sdk_instance.Ready()
		return c.String(http.StatusOK, "Ready")
	})
	e.GET("/allocate", func(c echo.Context) error {
		sdk_instance.Allocate()
		return c.String(http.StatusOK, "Allocate")
	})
	e.GET("/shutdown", func(c echo.Context) error {
		sdk_instance.Shutdown()
		return c.String(http.StatusOK, "Shutdown")
	})

	// サーバーをポート番号1323で起動
	e.Logger.Fatal(e.Start(":1323"))
}
