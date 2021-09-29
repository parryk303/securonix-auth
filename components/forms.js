import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'semantic-ui-react';
// import cors from 'cors';
// cors()

const Forms = ({ raForms }) => {
  return (
    <div className="raForms-container">
      <h1>Risk Assessment Forms</h1>
        <div className="grid wrapper">
          {raForms.map(raForm => {
            return (
              <div key={raForm._id}>
                <Card>
                  <Card.Content>
                    <Card.Header>
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