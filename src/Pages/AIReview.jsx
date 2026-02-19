export function AIReview() {
  return (
    <section className="h-screen bg-teal-700 py-10">
      {/* Users */}
      <div className="mb-10 flex justify-center">
        <figure className="flex flex-col items-center text-teal-100">
          <img
            className="h-132 w-132  rounded-xl object-cover shadow-lg"
            src="https://us.oricon-group.com/upimg/sns/7000/7311/img1200/Frieren_S1EP24-6-fern.jpg"
            alt="Fern avatar"
          />
          <figcaption className="mt-3 text-xl font-medium opacity-80">
            Fern_Ferver
          </figcaption>
        </figure>

        <figure className="flex flex-col items-center text-teal-100">
          <img
            className="h-132 w-132 rounded-xl object-cover shadow-lg"
            src="https://i.pinimg.com/originals/63/92/24/639224f094deff2ebf9cd261fba24004.jpg"
            alt="Frieren avatar"
          />
          <figcaption className="mt-3 text-xl font-medium opacity-80">
            Frieerieeeeen
          </figcaption>
        </figure>
      </div>

      {/* AI Generated Review */}
      <article className="mx-auto max-w-4xl rounded-2xl bg-teal-500 p-8 shadow-xl">
        <header className="mb-6 border-b border-teal-700 pb-4">
          <h2 className="text-lg font-semibold">AI Generated Review</h2>
          <p className="mt-1 text-sm text-teal-900">{"{Anime Title}"}</p>
        </header>

        <div className="space-y-5 text-sm leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur assumenda tenetur saepe iste magnam eum tempore
            reiciendis. Ad vero nulla libero reprehenderit, temporibus dolorem
            nobis alias sapiente veniam magnam non maxime.
          </p>

          <p>
            Ab, assumenda. Alias rerum autem architecto voluptatum accusantium
            quam ducimus eveniet temporibus cumque iure cum culpa incidunt
            similique in asperiores repellat quibusdam, animi voluptatem
            aliquam?
          </p>

          <p>
            Quia ratione non delectus, obcaecati nulla quidem tempore unde
            dolores accusantium eum cumque blanditiis sequi itaque nisi
            mollitia, reprehenderit repudiandae earum laborum vel iste minima.
          </p>
        </div>
      </article>
    </section>
  );
}
