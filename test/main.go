package main

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type RJCData struct {
	Field   string `json:"field"`
	Day     string `json:"day"`
	Time    string `json:"time"`
	Schiri1 string `json:"schiri1"`
	Schiri2 string `json:"schiri2"`
	Team1   string `json:"team1"`
	Team2   string `json:"team2"`
	Liga    string `json:"liga"`
}

func main() {
	var testData [5]RJCData
	testData[0] = RJCData{
		Field:   "A1",
		Day:     "SA",
		Time:    "17:00",
		Schiri1: "David",
		Schiri2: "Alex",
		Team1:   "Devils",
		Team2:   "Staubmilben",
		Liga:    "LWL 1v1",
	}

	testData[1] = RJCData{
		Field:   "B2",
		Day:     "SA",
		Time:    "12:45",
		Schiri1: "Christian",
		Schiri2: "Martin",
		Team1:   "Devils",
		Team2:   "Staubmilben",
		Liga:    "LWL 1v1",
	}

	testData[2] = RJCData{
		Field:   "A2",
		Day:     "SA",
		Time:    "12:50",
		Schiri1: "Lukas",
		Schiri2: "Noah",
		Team1:   "Devils",
		Team2:   "Staubmilben",
		Liga:    "LWL 1v1",
	}

	testData[3] = RJCData{
		Field:   "A4",
		Day:     "SA",
		Time:    "11:00",
		Schiri1: "Tim",
		Schiri2: "David",
		Team1:   "Team Faabs",
		Team2:   "Orion",
		Liga:    "Open",
	}

	testData[4] = RJCData{
		Field:   "B1",
		Day:     "SA",
		Time:    "10:00",
		Schiri1: "Lukas",
		Schiri2: "Lena",
		Team1:   "Luchse",
		Team2:   "Robotronic",
		Liga:    "Luchse",
	}

	fmt.Println(testData)

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
		}, ","),

		AllowCredentials: false,
	})

	app := fiber.New()

	app.Use(c)

	app.Get("/get", func(c *fiber.Ctx) error {
		data, err := json.Marshal(testData)
		if err != nil {
			panic(err)
		}
		return c.Send(data)
	})

	err := app.Listen(":3000")
	if err != nil {
		panic(err)
	}
}
