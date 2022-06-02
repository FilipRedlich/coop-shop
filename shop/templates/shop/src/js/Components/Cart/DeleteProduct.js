const DeleteProductForm = (props) => {
    const items = props.items;
    return (
      <form className="my-auto" action="/deleteProductToBasket/" method="POST">
        <input type="hidden" name="id" value={items[0]} />
        <input type="hidden" name="csrfmiddlewaretoken" value={CSRF_TOKEN} />
        <button type="submit" className="btn remove-item my-auto">
          <i className="bi bi-trash"></i>
        </button>
      </form>
    );
}
export default DeleteProductForm;