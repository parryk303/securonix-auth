import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { Button, Card } from 'semantic-ui-react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const Forms = ({ raForms }) => {
  return (
    <div className='raForms-container'>
      <br />
      <div className='grid wrapper'>
        {raForms.map(raForm => {
          return (
            <div className='raForm' key={raForm._id}>
              <Card id='item'>
                <Card.Content>
                  <Card.Header id='title'>
                    <Link href={`/${raForm._id}`}>
                      <a>{raForm.title}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${raForm._id}`} passHref>
                    <Button primary>View</Button>
                  </Link>
                  <Link href={`/${raForm._id}/edit`} passHref>
                    <Button primary>Edit</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Forms;