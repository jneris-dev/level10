import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface ResultModalProps {
  modalVisible: boolean
  rightAnswer: boolean
  onContinue: () => void
}

export const ResultModal = ({
  modalVisible,
  rightAnswer,
  onContinue
}: ResultModalProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={[styles.centeredView]}>
        {rightAnswer && (
          <View style={[styles.modalView, { backgroundColor: 'green' }]}>
            <Text style={styles.modalText}>Right Answer!</Text>
          </View>
        )}
        {!rightAnswer && (
          <View style={[styles.modalView, { backgroundColor: 'red' }]}>
            <Text style={styles.modalText}>Wrong Answer!</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={onContinue}
          style={styles.continueButton}>
          <Text style={styles.continueLabel}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: '#F194FF'
      },
      buttonClose: {
        backgroundColor: '#2196F3'
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
      },
      modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
      },
      continueButton: {
        backgroundColor: '#192938',
        height: 50,
        width: 200,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
      },
      continueLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
      }
})