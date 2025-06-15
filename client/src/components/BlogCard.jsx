import { Link } from 'react-router'


export default function BlogCard(props) {
  const { image, title, content, category, author, id } = props;



  return (
    <>
      <Link to={`/blog/${id}`} className="w-full max-w-md bg-white shadow-xl rounded-3xl hover:scale-105 transition-transform duration-300 overflow-hidden relative">

        <figure className="relative aspect-square w-full">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="badge absolute top-4 left-4 main-color-bg px-4 py-2 rounded-2xl">{category}</div>
        </figure>

        <div className="p-6">
          <h3 className="text-lg font-bold text-black">{title}</h3>

          <h4 className="italic text-gray-500 text-sm mb-2">Written by: {author.firstName} {author.lastName}</h4>
          <p className="text-gray-600 text-sm">{content}</p>
          {/* {isAuthenticated && (
            <div className="flex gap-2 items-end justify-end absolute bottom-3 right-3">
              <button
                onClick={handleEdit}
                className='cursor-pointer'
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className='cursor-pointer px-2'
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          )} */}
        </div>
      </Link>


    </>
  );
}
