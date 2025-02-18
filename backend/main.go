package main

import "strings"
import "github.com/gofiber/fiber/v2"
import "github.com/gofiber/fiber/v2/middleware/cors"


func main() {
    app := fiber.New(fiber.Config{
        ServerHeader: "rcj-gameSite:fiber",
    	AppName:      "rcj-gameSite",
    })

    c := cors.New(cors.Config{
    	AllowOrigins: strings.Join([]string{
    	    "*",
    	}, ","),

    	AllowMethods: strings.Join([]string{
    		fiber.MethodGet,
    		fiber.MethodPost,
    		fiber.MethodPatch,
    		fiber.MethodDelete,
    	}, ","),

    	AllowHeaders: strings.Join([]string{
    		"application/json",
    		"Access-Control-Allow-Headers",
    	}, ","),

    	AllowCredentials: false,
    })

    app.Use(c)

    app.Static("/", "./dist")

    app.Listen(":3000")
}