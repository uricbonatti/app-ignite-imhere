import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native'

import { styles } from './styles';
import { Participant } from '../../components/Participant';
import React, { useState } from 'react';

export function Home() {

  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd() {
    if (participantName.length === 0) {
      return Alert.alert('Participante sem nome', 'Não é possivel adicionar um participante sem nome');

    }
    if (participants.includes(participantName)) {
      return Alert.alert('Participante Exite', 'Já existe um participante na lista com esse nome');
    }
    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('');
  }


  function handleParticipantRemove(name: string) {    
    Alert.alert("Remover", `Remover o participante ${name}`, [
      {
        text: 'Sim',
        onPress: () => { 
          setParticipants(prevState=>prevState.filter(participant=>participant!==name))
        },
      },
      {
        text: 'Não',
      }
    ]);
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de novembro de 2022
      </Text>
      <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder='Nome do participante'
        placeholderTextColor='#6b6b6b'
        onChangeText={setParticipantName}
        value={participantName}  
      />
      <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
        <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguem chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />
    </View>
  )
}

