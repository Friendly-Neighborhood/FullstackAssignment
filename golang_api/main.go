package main

import "github.com/gin-contrib/cors"

import (
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
)

type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

var users = make(map[int]User)
var userIDCounter = 1 // Initialize a counter for generating unique user IDs

func main() {
    r := gin.Default()

    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"},
        AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
        AllowHeaders:     []string{"Origin", "Content-Type"},
        AllowCredentials: true,
    }))

    r.POST("/users", createUser)
    r.GET("/users", getAllUsers)
    r.GET("/users/:id", getUser)
    r.PUT("/users/:id", updateUser)
    r.DELETE("/users/:id", deleteUser)

    r.Run() // Listen and serve on localhost:8080
}

func getAllUsers(c *gin.Context) {
    userList := make([]User, 0, len(users))
    for _, user := range users {
        userList = append(userList, user)
    }
    c.JSON(http.StatusOK, userList)
}

// Inside the createUser function
func createUser(c *gin.Context) {
    var newUser User
    if err := c.BindJSON(&newUser); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Check if the email already exists
    for _, user := range users {
        if user.Email == newUser.Email {
            c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
            return
        }
    }

    // Generate a unique ID for the new user
    newUser.ID = userIDCounter
    userIDCounter++

    users[newUser.ID] = newUser

    // Send a success message
    c.JSON(http.StatusOK, gin.H{"message": "User added successfully"})
}

func getUser(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    if user, exists := users[id]; exists {
        c.JSON(http.StatusOK, user)
    } else {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
    }
}

func updateUser(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    var updatedUser User
    if err := c.BindJSON(&updatedUser); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if _, exists := users[id]; exists {
        users[id] = updatedUser
        c.JSON(http.StatusOK, updatedUser)
    } else {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
    }
}

func deleteUser(c *gin.Context) {
    id, _ := strconv.Atoi(c.Param("id"))
    if _, exists := users[id]; exists {
        delete(users, id)
        c.JSON(http.StatusOK, gin.H{"message": "User deleted"})
    } else {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
    }
}