import React from 'react'
import { useQuery, gql } from '@apollo/client';
import './App.css'

const query = gql`
  query getTodosWithUser{
      getTodos {
        id
        title
        completed
        user {
          id
          name
          email
        } 
      }
    }
  `;

  export default function App() {
    const {loading, error, data} = useQuery(query);

    if(loading){
      return (
        <div>Loading....</div>
      )
    }

    return (
      <div>
        <h2>My first Apollo app 🚀</h2>
        <div style={{display: 'flex', flexDirection:'column', gap:'10px'}}>
          {
            data.getTodos.map((e, index)=>{
              return(
                  <p key={index}>{e.title}</p>
              )
            })
          }
        </div>
      </div>
    );
  }