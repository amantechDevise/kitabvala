

function SpecialOffer(){
    return(
        <section className="py-16 bg-gray-900 text-white">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Summer Sale</h2>
        <p className="text-xl text-gray-300 mb-6">
          Up to 50% off on selected items. Limited time offer.
        </p>
        <div className="flex gap-4 mb-8">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <span className="block text-3xl font-bold">00</span>
            <span className="text-sm text-gray-300">Days</span>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <span className="block text-3xl font-bold">12</span>
            <span className="text-sm text-gray-300">Hours</span>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <span className="block text-3xl font-bold">45</span>
            <span className="text-sm text-gray-300">Minutes</span>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <span className="block text-3xl font-bold">30</span>
            <span className="text-sm text-gray-300">Seconds</span>
          </div>
        </div>
        <a
          href="#"
          className="inline-block py-3 px-8 bg-white text-gray-900 font-medium rounded-button hover:bg-gray-100 transition-colors whitespace-nowrap"
        >
          Shop the Sale
        </a>
      </div>
      <div className="md:w-1/2">
        <img
          src="https://readdy.ai/api/search-image?query=stylish%20summer%20clothing%20collection%20with%20discount%20tags%2C%20professional%20fashion%20photography%2C%20multiple%20items%20arranged%20elegantly%2C%20high-end%20apparel%20on%20minimal%20background&width=600&height=400&seq=sale1&orientation=landscape"
          alt="Summer Sale"
          className="rounded-lg w-full"
        />
      </div>
    </div>
  </div>
</section>

    )
}
  export default SpecialOffer;