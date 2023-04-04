// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"

export default async function handler(req, res) { 

  const {email, firstName, lastName} = req.body

  if (req.method == 'PUT') {

    await axios.put
    (
      [process.env.SENGRID_API_URL],
      {
        "contacts": 
        [{
            email: email,
            first_name: firstName,
            last_name: lastName,
        }],
        "list_ids": [process.env.SENDGRID_LIST_IDS],
      },
      {
        headers: 
        {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        },
      }
    )
    .then
    (
      (response) => 
      {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText)
        res.status(200).send
        (
          {
            message: "Contact created in SendGrid:"
          }
        )
      }
    )

    .catch
    (
        (error) => 
      {
        console.log(response.data)
        console.log(response.status)
        console.log(error.response.headers)
        console.error('There was an error!', error)
        res.status(500).send
        (
          {
            message: 'Not retrieved by server'
          }
        )
      }
    )
  }
}