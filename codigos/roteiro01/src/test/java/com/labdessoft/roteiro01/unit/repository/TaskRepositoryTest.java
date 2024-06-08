package com.labdessoft.roteiro01.unit.repository;

import com.labdessoft.roteiro01.entity.Task;
import com.labdessoft.roteiro01.repository.TaskRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class TaskRepositoryTest {

    @Autowired
    private TaskRepository taskRepository;

    @Test
    @DisplayName("Should find all tasks")
    public void shouldFindAllTasks() {
        Task task1 = new Task(null, "Primeira tarefa", false);
        Task task2 = new Task(null, "Segunda tarefa", true);
        taskRepository.save(task1);
        taskRepository.save(task2);

        assertEquals(2, taskRepository.findAll().size());
    }

    @Test
    @DisplayName("Should save task")
    public void shouldSaveTask() {
        Task task = new Task(null, "Nova tarefa", false);
        Task savedTask = taskRepository.save(task);
        assertNotNull(savedTask.getId());
        assertEquals("Nova tarefa", savedTask.getDescription());
    }

    @Test
    @DisplayName("Should update task")
    public void shouldUpdateTask() {
        Task task = new Task(null, "Nova tarefa", false);
        Task savedTask = taskRepository.save(task);

        savedTask.setDescription("Tarefa atualizada");
        savedTask.setCompleted(true);
        Task updatedTask = taskRepository.save(savedTask);

        assertEquals(savedTask.getId(), updatedTask.getId());
        assertEquals("Tarefa atualizada", updatedTask.getDescription());
        assertTrue(updatedTask.isCompleted());
    }

    @Test
    @DisplayName("Should delete task")
    public void shouldDeleteTask() {
        Task task = new Task(null, "Nova tarefa", false);
        Task savedTask = taskRepository.save(task);
        taskRepository.delete(savedTask);

        Optional<Task> deletedTask = taskRepository.findById(savedTask.getId());
        assertTrue(deletedTask.isEmpty());
    }
}