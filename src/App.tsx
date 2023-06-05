import { useEffect, useState } from 'react'
import FirebaseController from './services/firebase/firebase'
import { Unsubscribe, onSnapshot } from 'firebase/firestore'
import UserSelection from './components/UserSelection'
import AssetLiabilityForm from './components/AssetLiabilityForm'
import { Record, RecordData } from './types/data'
import NetWorthTable from './components/NetWorthTable'

function App() {
  const firebaseController = FirebaseController()
  const [username, setUsername] = useState<string>('Jack')
  const [userId, setUserId] = useState<string>('8oOMP68ABVzWCfvGW7OM')
  const [userIsValid, setUserIsValid] = useState<boolean>(true)
  const [records, setRecrods] = useState<Record[]>([])

  useEffect(() => {
    let unsubscribeRecords: Unsubscribe
    ;(async () => {
      const tmpUserId = await firebaseController.getUserId(username)

      if (!tmpUserId) {
        setUserIsValid(false)
        setUserId('')
        return
      }

      const recordsCollecitonRef =
        firebaseController.getUserRecordsCollectionRef(tmpUserId)
      unsubscribeRecords = onSnapshot(recordsCollecitonRef, (recordsSnapshot) => {
        const tmpRecords: Record[] = []

        recordsSnapshot.forEach((record) => {
          const recordId = record.id
          const recordData = record.data() as RecordData
          tmpRecords.push({ id: recordId, ...recordData })
        })
        setRecrods(tmpRecords)
      })

      setUserIsValid(true)
      setUserId(tmpUserId)
    })()

    return () => {
      if (unsubscribeRecords) {
        unsubscribeRecords()
      }
    }
  }, [username])

  return (
    <>
      <h1>Net Worth Tracker</h1>
      <UserSelection
        username={username}
        setUsername={setUsername}
        usernameIsValid={userIsValid}
      />
      <AssetLiabilityForm userId={userId} firebaseController={firebaseController} />
      <NetWorthTable records={records} />
    </>
  )
}

export default App
