'use client'

import { useEffect } from 'react'

import { PageItem } from '@/lib/db-types'
import { getFormattedIdentifier } from '@/lib/utils'

import { Video } from '../video/video'
import { WebLink } from '../web-link/web-link'
import { CardBody } from './card-body'
import { CardInformation } from './card-information'

type CardProps = {
  item: PageItem
}

export const Card = ({ item }: CardProps) => {
  const { cover, imgPlaceholder, titleCard, infoExtra, links, videos } = item

  useEffect(() => {
    const highlightedCard =
      window.location.hash === `#${getFormattedIdentifier(item.imgPlaceholder)}`

    if (highlightedCard) {
      const card = document.getElementById(
        getFormattedIdentifier(item.imgPlaceholder)
      )
      card?.classList.add('ring-accent')
      setTimeout(() => {
        card?.classList.remove('ring-accent')
      }, 2000)
    }
  }, [item.imgPlaceholder])

  return (
    <div
      className='card p-4 ring-1 bg-base-100 shadow-lg h-auto hover:scale-105 transition-transform'
      id={getFormattedIdentifier(imgPlaceholder)}>
      <CardBody cover={cover} imgPlaceholder={imgPlaceholder} />
      <>
        <p className='py-1 truncate'>
          <a
            className='pointer-events-none'
            href={`#${getFormattedIdentifier(imgPlaceholder)}`}>
            {imgPlaceholder}
          </a>
        </p>
        <div className='divider m-0 p-0'></div>
        <CardInformation
          href={imgPlaceholder}
          title={titleCard}
          infoExtra={infoExtra}
        />
        <div className='flex flex-wrap gap-2 pt-1'>
          {links?.map(({ url, type }, index) => (
            <WebLink
              eventName={`Click on ${imgPlaceholder} - ${type.toLowerCase()}`}
              key={index}
              className='btn btn-sm btn-outline btn-accent'
              href={url}>
              {type}
            </WebLink>
          ))}
          {videos?.map((video, index) => <Video key={index} video={video} />)}
        </div>
      </>
    </div>
  )
}
