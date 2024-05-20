package com.labdessoft.roteiro01.integration;

import com.labdessoft.roteiro01.Roteiro01Application;
import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(classes = {Roteiro01Application.class}, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("test")
public class TaskControllerIntegrationTest {

    @BeforeEach
    public void setup() {
        RestAssured.baseURI = "http://localhost:8080";
        RestAssured.port = 8080;
    }

    @Test
    public void whenGetTasks_thenStatus200() {
        get("/api/tasks").then().statusCode(200);
    }

    @Test
    public void whenGetTaskById_thenStatus200_andCorrectDescription() {
        get("/api/tasks/1").then().statusCode(200)
                .assertThat().body("description", equalTo("Primeira tarefa"));
    }

    @Test
    public void whenCreateTask_thenStatus201_andLocationHeader() {
        given()
                .contentType("application/json")
                .body("{\"description\": \"Nova tarefa\"}")
                .when()
                .post("/api/tasks")
                .then()
                .statusCode(201)
                .header("Location", containsString("/api/tasks/"));
    }

    @Test
    public void whenUpdateTask_thenStatus200_andUpdatedDescription() {
        given()
                .contentType("application/json")
                .body("{\"description\": \"Tarefa atualizada\"}")
                .when()
                .put("/api/tasks/1")
                .then()
                .statusCode(200)
                .assertThat().body("description", equalTo("Tarefa atualizada"));
    }

    @Test
    public void whenDeleteTask_thenStatus204() {
        when()
                .delete("/api/tasks/1")
                .then()
                .statusCode(204);
    }
}