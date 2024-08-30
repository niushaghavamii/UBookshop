export const Block = (props) => {
  if (!props.state.cart) {
    props.state.cart = [];
  }

  let size = props.state.cart.includes(props.book.title) ? 38 : 38;

  return (
    <c-c
      style={{
        width: 150,
        backgroundColor: "#FFFFFFE3",
        flex: 1,
        minWidth: 155,
        position: "relative",
        borderRadius: "15px",
        margin: "10px  10px",
        boxShadow: "0px 0px 9px 2px rgba(82 82 82 / 0.91)",
      }}
    >
      <img
        className={global.styles.hover}
        src={props.book.imageLink}
        style={{
          width: "100%",
          height: 200,
          objectFit: "fill",
          minWidth: 155,
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
        onClick={() => {
          props.state.form = "bookspecs";
          props.state.book = props.book;
          props.refresh();
        }}
      />

      <f-cc
        style={{
         
          padding: "5px 10px",
          backgroundColor: "#FFFFFF48",
          width: "100%",
          height: "40px",
          direction: "ltr",
        }}
      >
        <f-13
        style={{

          fontWeight: "bold",
        }}
        
        >{props.book.title}</f-13>
      </f-cc>
      <hr
        style={{
          width: "90%",
          opacity: 0.4,
        }}
      />
      <f-csb
        style={{
          fontSize: "1.5em",
          padding: "10px 0",
          width: "100%",
        }}
      >
        <img
          src={
            props.state.cart.includes(props.book.title)
              ? "/pics/check.png/"
              : "/pics/bag4.png/"
          }
          style={{
            height: size,
            width: size,
            objectFit: "contain",
            margin: "0 10px",
          }}
        />

        <c-x
          style={{
            direction: "ltr",
            margin: "5px 0",
          }}
        >
          <f-15
            style={{
              fontSize: "1rem",
              margin: "0px 3px",
            }}
          >
            <del>
              {(props.book.price as number).toLocaleString("fa-IR")} تومان
            </del>
          </f-15>

          <f-15
            style={{
              fontSize: "0.9em",
              margin: "0px 3px",
            }}
          >
            {((props.book.price * 0.8) as number).toLocaleString("fa-IR")}تومان
          </f-15>
        </c-x>
      </f-csb>
    </c-c>
  );
};
