import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

interface Task {
  id: number
  title: string
  done: boolean
}

interface TaskItemProps {
  index: number
  task: Task
  toggleTaskDone: (id: number) => void
  removeTask: (id: number) => void
  editTask: (taskId: number, taskNewTitle: string) => void
}

export function TaskItem({
  index,
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isItemBeingEdited, setIsItemBeingEdited] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)

  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsItemBeingEdited(true)
  }

  function handleCancelEditing() {
    setEditedTitle(task.title)
    setIsItemBeingEdited(false)
  }

  function handleSubmitEditing() {
    editTask(task.id, editedTitle)
    setIsItemBeingEdited(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isItemBeingEdited) {
        textInputRef.current.focus()
      } else {
        textInputRef.current.blur()
      }
    }
  }, [isItemBeingEdited])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={editedTitle}
            onChangeText={setEditedTitle}
            editable={isItemBeingEdited}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsWrapper}>
        {isItemBeingEdited ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
            style={{ paddingRight: 12 }}
          >
            <Icon name="x" size={22} color="#B2B2B2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
            style={{ paddingRight: 12 }}
          >
            <Icon name="edit" size={18} color="#B2B2B2" />
          </TouchableOpacity>
        )}

        <View
          style={{
            width: 1,
            height: 24,
            backgroundColor: 'rgba(196, 196, 196, 0.5)',
          }}
        />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingRight: 24, paddingLeft: 12 }}
          onPress={() => removeTask(task.id)}
          disabled={isItemBeingEdited}
        >
          <Icon name="trash-2" size={18} color="#B2B2B2" />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  iconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
