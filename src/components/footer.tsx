const Footer = () => {
  return (
    <footer className="text-gray-600 border-t border-gray-400 font-sans">
      <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
        <p className="text-sm text-gray-600 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4">
          © 2024. 
          <a
            href="https://www.github.com/mdvsh"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            mdvsh
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:py-2 sm:mt-0 mt-4">
        We don&apos;t store your data.
        </p>
        </span>
      </div>
    </footer>
  );
};

export default Footer

