import styles from '../styles/Home.module.css'
import React, { useCallback, useState } from 'react'
import { GraphQLClient, gql } from 'graphql-request'

const client = new GraphQLClient("https://nudge-buddy.herokuapp.com/")


const mutation = gql`
  mutation exampleMutation(
    $token: String!
    $name: String!
    $age: Int!
  ) {
    createOrFetchAccount(
      token: $token
      name: $name
      age: $age
    ) {
      success
      supabaseUser {
        id
        token
        name
        age
      }
    }
  }
`

const mutationTwo = gql`
  mutation exampleMutationTwo(
    $token: String!
  ) {
    createMem(
      token: $token
    ) {
      success
    }
  }
`

const Home = () => {
  const [token, setToken] = useState('')
  const [tokenTwo, setTokenTwo] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [result, setResult] = useState('')
  const [resultTwo, setResultTwo] = useState('')
  
  const submitToServer = useCallback(() => {
    client.rawRequest(mutation, {
      token,
      name,
      age: parseInt(age, 10)
    }).then((data) => setResult(data))
  }, [
    token, name, age, setResult
  ])

  const submitToServerTwo = useCallback(() => {
    client.rawRequest(mutationTwo, {
      token
    }).then((data) => setResultTwo(data))
  }, [
    token, name, setResultTwo
  ])

  return (
    <div>
      <h1>
        USER MANAGEMENT!
      </h1>
      <div className={styles.container}>
      Token
      <input value={token} onChange={e => setToken(e.target.value)} />
      Name
      <input value={name} onChange={e => setName(e.target.value)} />
      Age
      <input value={age} onChange={e => setAge(e.target.value)} />
      <button onClick={submitToServer}>create or update user</button>
      <div>
        result
        {JSON.stringify(result, null, 2)}
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <h1>
        MEM Manager
      </h1>
      <div className={styles.container}>
      Token
      <input value={tokenTwo} onChange={e => setTokenTwo(e.target.value)} />
      <button onClick={submitToServerTwo}>create mem for token</button>
      <div>
      resultTwo
        {JSON.stringify(resultTwo, null, 2)}
      </div>
    </div>
    </div>
  
  )
}

export default Home