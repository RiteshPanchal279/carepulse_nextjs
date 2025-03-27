'use client'
import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'


type FileUploderProps={
   files:File[]|undefined,
   onChange:(files:File[])=>void

}


const FileUploder=({files,onChange}:FileUploderProps)=> {
  const onDrop = useCallback((acceptedFiles:File[]) => {
   onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='text-[14px] text-gray-500 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed  border-[#363A3D] bg-[#1A1D21] p-5'>
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
         <Image 
         src={convertFileToUrl(files[0])}
         width={1000}
         height={1000}
         alt='uploded image'
         className='max-h-[400px] overflow-hidden object-cover'
         />
      ):
      <>
      <Image 
         src='/assets/icons/upload.svg'
         width={40}
         height={40}
         alt='upload'
      />

      <div className='flex flex-col justify-center gap-2 text-center text-dark-600'>
      <p className='text-14-regular'>
         <span className='text-[#24AE7C]'>Click to upload</span> or drag and drop
      </p>
      <p>
         SVG,PNG,JPG or GIF (max.800x400)
      </p>
      </div>
      </>
      }
      
    </div>
  )
}

export default FileUploder
