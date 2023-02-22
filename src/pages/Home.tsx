import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    // TODO - add new task
    const doTaskExist = tasks.find((task) => task.title === newTaskTitle)

    if (doTaskExist) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
        [
          {
            text: 'Cancelar',
            style: 'destructive',
          },
          { text: 'OK' },
        ],
      )

      return
    }

    setTasks((state) => [
      ...state,
      { id: new Date().getTime(), done: false, title: newTaskTitle },
    ])
  }

  function handleToggleTaskDone(id: number) {
    // TODO - toggle task done if exists
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  function removeTask(id: number) {
    const tasksWithoutDeletedOnes = tasks.filter((task) => task.id !== id)

    setTasks(tasksWithoutDeletedOnes)
  }

  function handleRemoveTask(id: number) {
    // TODO - remove task from state
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => removeTask(id) },
      ],
    )
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          title: taskNewTitle,
        }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
})
