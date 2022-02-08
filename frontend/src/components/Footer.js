const Footer = () => {
  return (
    <div className="text-center mt-6 p-4">
      <p className="text-gray-400 text-sm font-medium">
        Desarrollado por{' '}
        <a
          href="https://markosmk.com"
          className="text-black hover:text-gray-600 transition-colors"
        >
          MarkosMk
        </a>{' '}
        |{' '}
        <a
          href="mailto:markosmke@me.com"
          className="text-black hover:text-gray-600 transition-colors"
        >
          markosmk@me.com
        </a>
      </p>
    </div>
  );
};

export default Footer;
