import CallList from '@/components/CallList'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <section className="flex size-full flex-col gap-10 p-5">
    <h1 className="text-xl font-semibold text-theme-textInactive">Previous Meetings</h1>
    <CallList type="ended" />
  </section>
  )
}

export default Page