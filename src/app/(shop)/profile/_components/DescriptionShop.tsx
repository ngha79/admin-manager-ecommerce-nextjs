'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import CustomUploadAdapter from '@/hooks/CustomUploadAdapter'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build'
import { updateProfileShop } from '@/utils/actions/shop'

const DescriptionShop = ({ description }: { description: string }) => {
  const [updateDescription, setUpdateDescription] =
    useState<string>(description)
  const handleOnChange = (data: string) => {
    setUpdateDescription(data)
  }

  const handleUpdate = async () => {
    const res = await updateProfileShop({ description: updateDescription })
    if (res.error) {
      return toast.error(res.message)
    }
    return toast.success('Cập nhật thông tin thành công')
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return new CustomUploadAdapter(loader)
    }
  }

  const editorConfiguration = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
    ],
    extraPlugins: [uploadPlugin],
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <h1 className="text-lg font-medium">Giới thiệu về Shop</h1>
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        data={description}
        onChange={(event, editor) => {
          const data = editor.getData()
          handleOnChange(data)
        }}
      />
      <Button
        variant={'success'}
        onClick={handleUpdate}
      >
        Cập nhật
      </Button>
    </div>
  )
}

export default DescriptionShop
