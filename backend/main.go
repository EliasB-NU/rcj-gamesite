package main

import "github.com/gofiber/fiber/v2"

func main() {
    app := fiber.New()

    app.Static("/", "../")

    app.Listen(":3000")
}