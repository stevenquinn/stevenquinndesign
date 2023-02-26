import React from 'react'

export default function FeaturedImage({ image, title }) {

    return (
        <div className="mb-8">
            <img
                srcset={ image.images.fallback.srcSet }
                sizes={ image.images.fallback.sizes }
                src={ image.images.fallback.src }
                alt={ title }
                className="w-full h-auto rounded border border-slate-200 shadow-lg"
            />
        </div>
    )
}