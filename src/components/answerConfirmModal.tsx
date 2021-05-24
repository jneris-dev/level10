import React from 'react'
import { View, Modal, Pressable, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface AnswerConfirmModalProps {
  userAnswerChoise: string
  visible: boolean
  onBackDropPress: () => void
  onCancel: () => void
  onConfirm: () => void
}

export const AnswerConfirmModal = ({
  userAnswerChoise,
  visible,
  onBackDropPress,
  onCancel,
  onConfirm
}: AnswerConfirmModalProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <Pressable onPress={onBackDropPress} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Choose:</Text>
            <Text style={styles.answer}>{userAnswerChoise}?</Text>
          </View>
          <View
            style={styles.buttonsWrapper}>
            <TouchableOpacity
              onPress={onConfirm}
              style={[
                styles.answerButton,
                {
                  backgroundColor: 'green'
                }
              ]}>
              <Text style={styles.answerButtonLabel}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCancel}
              style={[
                styles.answerButton,
                {
                  backgroundColor: 'red'
                }
              ]}>
              <Text style={styles.answerButtonLabel}>NO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
        bottom: -20
      },
      modalContent: {
        margin: 20,
        backgroundColor: 'white',
        paddingBottom: 45,
        paddingTop: 14,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%'
      },
      answerButton: {
        paddingHorizontal: 25,
        paddingVertical: 15
      },
      answerButtonLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
      },
      buttonsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      titleWrapper: {
        marginBottom: 20
      },
      title: {
        fontWeight: 'bold',
        fontSize: 16
      },
      answer: {
        fontSize: 16,
        marginTop: 2
      }
})