import { PostData, PostResponse } from '@/types/postData'

export async function createPostAPI(data: PostData) {
  const response = await fetch('https://lets-go-8s43.onrender.com/cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const responseData: PostResponse = await response.json()

  if (response.ok && responseData.id) {
    localStorage.setItem('userCardId', JSON.stringify(responseData.id))
    localStorage.setItem('userCardData', JSON.stringify(data))
  }

  return responseData
}
