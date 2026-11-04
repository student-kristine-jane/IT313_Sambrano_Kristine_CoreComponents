import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const initialStudents = [
  {
    id: 's1',
    name: 'Ana Cruz',
    year: '3rd Year',
    photoUrl: 'https://i.pravatar.cc/100?img=1',
    flagged: false,
  },
  {
    id: 's2',
    name: 'Bea Santos',
    year: '2nd Year',
    photoUrl: 'https://i.pravatar.cc/100?img=2',
    flagged: false,
  },
  {
    id: 's3',
    name: 'Cid Ramos',
    year: '4th Year',
    photoUrl: 'https://i.pravatar.cc/100?img=3',
    flagged: false,
  },
  {
    id: 's4',
    name: 'Dex Alonzo',
    year: '1st Year',
    photoUrl: 'https://i.pravatar.cc/100?img=4',
    flagged: false,
  },
  {
    id: 's5',
    name: 'Eli Tan',
    year: '3rd Year',
    photoUrl: 'https://i.pravatar.cc/100?img=5',
    flagged: false,
  },
];

function StudentCard({
  id,
  name,
  year,
  photoUrl,
  flagged,
  onToggleFlag,
}) {
  return (
    <View style={styles.studentCard}>
      <Image
        source={{ uri: photoUrl }}
        style={styles.studentImage}
      />

      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{name}</Text>
        <Text style={styles.studentYear}>{year}</Text>

        <View style={styles.studentId}>
          <Text style={styles.studentIdText}>
            ID: {id.toUpperCase()}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onToggleFlag}
        style={({ pressed }) => [
          styles.flagButton,
          flagged && styles.flaggedButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Text
          style={[
            styles.flagButtonText,
            flagged && styles.flaggedButtonText,
          ]}
        >
          {flagged ? '✓ Flagged' : '+ Flag'}
        </Text>
      </Pressable>
    </View>
  );
}

export default function StudentDirectory() {
  const [students, setStudents] = useState(initialStudents);
  const [query, setQuery] = useState('');

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(query.toLowerCase())
  );

  const toggleFlag = (studentId) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId
          ? { ...student, flagged: !student.flagged }
          : student
      )
    );
  };

  const flaggedCount = students.filter(
    (student) => student.flagged
  ).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F8FC"
      />

      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>IT313 • MOBILE PROGRAMMING</Text>
          <Text style={styles.title}>Student Directory</Text>
          <Text style={styles.subtitle}>
            Academic advising made simple.
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Text style={styles.headerIconText}>S</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>⌕</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search students..."
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>
            All Students
          </Text>
          <Text style={styles.sectionSubtitle}>
            {filteredStudents.length} students found
          </Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {flaggedCount} flagged
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        keyboardShouldPersistTaps="handled"
      >
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              id={student.id}
              name={student.name}
              year={student.year}
              photoUrl={student.photoUrl}
              flagged={student.flagged}
              onToggleFlag={() => toggleFlag(student.id)}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>⌕</Text>
            <Text style={styles.emptyTitle}>
              No students found
            </Text>
            <Text style={styles.emptyText}>
              Try searching with another name.
            </Text>
          </View>
        )}

        <Text style={styles.footer}>
          STUDENT DIRECTORY • IT313
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
    paddingHorizontal: 22,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 25,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#7C82A0',
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#222640',
    letterSpacing: -0.8,
  },

  subtitle: {
    fontSize: 13,
    color: '#8A8FA8',
    marginTop: 7,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#E7E9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerIconText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#6569D8',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ECEEF5',
    marginBottom: 28,
  },

  searchIcon: {
    fontSize: 28,
    color: '#858AA3',
    marginRight: 12,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#222640',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#222640',
  },

  sectionSubtitle: {
    fontSize: 12,
    color: '#969BB0',
    marginTop: 5,
  },

  countBadge: {
    backgroundColor: '#EDEEFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#696DD6',
  },

  listContainer: {
    paddingBottom: 30,
  },

  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 13,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ECEEF5',
  },

  studentImage: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: '#E7E9F0',
  },

  studentInfo: {
    flex: 1,
    marginLeft: 13,
  },

  studentName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222640',
  },

  studentYear: {
    fontSize: 12,
    color: '#9297AA',
    marginTop: 5,
  },

  studentId: {
    alignSelf: 'flex-start',
    backgroundColor: '#F2F3F9',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 7,
  },

  studentIdText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#858AA3',
  },

  flagButton: {
    backgroundColor: '#F0F1FF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },

  flaggedButton: {
    backgroundColor: '#E4F6ED',
  },

  pressedButton: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },

  flagButtonText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#686DD6',
  },

  flaggedButtonText: {
    color: '#24845B',
  },

  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 65,
  },

  emptyIcon: {
    fontSize: 42,
    color: '#A4A8C0',
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222640',
  },

  emptyText: {
    fontSize: 13,
    color: '#9297AA',
    marginTop: 8,
  },

  footer: {
    textAlign: 'center',
    fontSize: 10,
    color: '#A4A8B8',
    letterSpacing: 1.5,
    marginTop: 18,
  },
});