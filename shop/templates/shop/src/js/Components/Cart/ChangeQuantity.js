import CreateOptions from "./CreateOptions";
const ChangeQuantityForm = (props) => {
    const items = props.items;
    return (
      <form
        action="/changeQuantityInBasket/"
        method="POST"
        className="quantity-form"
      >
        <input type="hidden" name="csrfmiddlewaretoken" value={CSRF_TOKEN} />
        <input type="hidden" name="id" value={items[0]} />
        <select defaultValue={items[9]} className="quantity-select" name="quantity">
          <CreateOptions howMany={items} />
        </select>
        <input type="submit" value="Change" className="quantity-change" />
      </form>
    );
}

export default ChangeQuantityForm;