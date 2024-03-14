import React from 'react'
import PdfList from './components/PdfViewer'
import DefaultLayout from './layout/DefaultLayout'

const PdfView = () => {
  return (
    <DefaultLayout>
        <PdfList />
    </DefaultLayout>
  )
}

export default PdfView