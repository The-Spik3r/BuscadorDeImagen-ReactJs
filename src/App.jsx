import { Formik, Form, Field } from 'formik'
import './App.css'
import './header.css'
import './content.css'
import './article.css'
import { useState } from 'react'

function App() {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  return(
    <div>
      <header>
        <Formik
        initialValues={{ search: '' }}
        onSubmit={async values => {
          const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
            headers: {
              'Authorization': 'Client-ID qvy2y7fRCE_mIZrDJ8fevnKO8Mm29ZYhiXQSRq70mOw'
            }
          })
          const data = await response.json()
          setPhotos(data.results)
        }}
        >
        <Form>
          <h1>Buscador De Imagen</h1>
          <Field name='search' placeholder='search'/>
        </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {photos.map(photo =>
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular}  />
              <p>{[photo.description, photo.alt_description].join('-')}</p>
            </article>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
