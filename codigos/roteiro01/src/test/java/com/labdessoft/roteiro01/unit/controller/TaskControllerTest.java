package com.labdessoft.roteiro01.unit.controller;

import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class TaskControllerTest {

    @InjectMocks
    private TaskController taskController;

    @Mock
    private TaskService taskService;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(taskController).build();
    }

    @Test
    @DisplayName("Should return all tasks")
    public void shouldReturnAllTasks() throws Exception {
        when(taskService.listAll(any())).thenReturn(TaskMock.createTasks());

        mockMvc.perform(get("/api/tasks").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content.length()").value(2));

        verify(taskService, times(1)).listAll(any());
    }

    @Test
    @DisplayName("Should return task by id")
    public void shouldReturnTaskById() throws Exception {
        Task task = new Task(1L, "Primeira tarefa", false);

        when(taskService.findById(anyLong())).thenReturn(task);

        mockMvc.perform(get("/api/tasks/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("Primeira tarefa"));

        verify(taskService, times(1)).findById(anyLong());
    }

    @Test
    @DisplayName("Should create a new task")
    public void shouldCreateNewTask() throws Exception {
        Task task = new Task(1L, "Nova tarefa", false);

        when(taskService.save(any(Task.class))).thenReturn(task);

        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"description\":\"Nova tarefa\", \"completed\":false}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.description").value("Nova tarefa"));

        verify(taskService, times(1)).save(any(Task.class));
    }

    @Test
    @DisplayName("Should update an existing task")
    public void shouldUpdateTask() throws Exception {
        Task task = new Task(1L, "Tarefa atualizada", true);

        when(taskService.update(anyLong(), any(Task.class))).thenReturn(task);

        mockMvc.perform(put("/api/tasks/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"description\":\"Tarefa atualizada\", \"completed\":true}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("Tarefa atualizada"))
                .andExpect(jsonPath("$.completed").value(true));

        verify(taskService, times(1)).update(anyLong(), any(Task.class));
    }

    @Test
    @DisplayName("Should delete a task")
    public void shouldDeleteTask() throws Exception {
        doNothing().when(taskService).delete(anyLong());

        mockMvc.perform(delete("/api/tasks/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        verify(taskService, times(1)).delete(anyLong());
    }
}