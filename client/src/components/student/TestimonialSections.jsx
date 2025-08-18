import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

function TestimonialSections() {
  return (
    <div className="pb-14 px-8 md:px-0">
      {/* Heading */}
      <h2 className="text-3xl font-medium text-gray-800 text-center">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3 text-center">
        Hear from our learners as they share their journeys of transformation, success, and how our
        <br />
        platform has made a difference in their lives.
      </p>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 justify-center">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="w-[350px] text-sm text-left border border-gray-200 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
          >
            {/* Top Section */}
            <div className="flex items-center gap-4 py-4 px-5 bg-gray-100">
              <img
                className="h-12 w-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{testimonial.name}</h1>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            </div>

            {/* Stars + Feedback */}
            <div className="p-5 pb-3">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => {
                  if (testimonial.rating >= i + 1) {
                    return (
                      <img
                        key={i}
                        className="h-5"
                        src={assets.star}
                        alt="full star"
                      />
                    );
                  } else if (testimonial.rating >= i + 0.5) {
                    return (
                      <img
                        key={i}
                        className="h-5"
                        src={assets.star_half}
                        alt="half star"
                      />
                    );
                  } else {
                    return (
                      <img
                        key={i}
                        className="h-5"
                        src={assets.star_blank}
                        alt="empty star"
                      />
                    );
                  }
                })}
              </div>

              <p className="text-gray-500 mb-4">{testimonial.feedback}</p>
              <a href="#" className="text-blue-500 underline px-5">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialSections