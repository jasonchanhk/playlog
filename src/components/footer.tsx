import React from 'react'
import Container from './container'

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <div className="text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            <div className='text-4xl lg:text-5xl font-bold tracking-tighter leading-tight'>Deployment</div>
            <ol className='list-decimal pl-4 py-4'>
              <li>Dec 26, 2023</li>
              <li>Mar 16, 2024</li>
            </ol>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://next-blog-wordpress.vercel.app"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Style Reference
            </a>
            <a
              href={`https://github.com/jasonchanhk/playlog`}
              className="mx-3 font-bold hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer