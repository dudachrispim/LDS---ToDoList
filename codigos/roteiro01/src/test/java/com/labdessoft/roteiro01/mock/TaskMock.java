package com.labdessoft.roteiro01.mock;

import com.labdessoft.roteiro01.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;

public class TaskMock {

    public static Page<Task> createTasks() {
        Task task1 = new Task(1L, "Primeira tarefa", false);
        Task task2 = new Task(2L, "Segunda tarefa", true);
        return new PageImpl<>(Arrays.asList(task1, task2));
    }
}
