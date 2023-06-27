import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useUserLogin } from './useUserLogin';

export const useProducts = () => {
  const { IdAlmacenes } = useUserLogin();
  const { entradas } = useSelector((state) => state.Entradas);
  const { salidas } = useSelector((state) => state.Salidas);
  const { productoEntradaBD: proEntradas } = useSelector(
    (state) => state.ProductoEntrada
  );
  const { productoSalidaBD: proSalidas } = useSelector(
    (state) => state.ProductoSalida
  );

  const { productos: allProductos } = useSelector((state) => state.Productos);

  const ProductosActuales = useMemo(() => {
    const ContadorEntradas = proEntradas.reduce((acc, proEntrada) => {
      const { IdProducto, Cantidad, IdEntrada } = proEntrada;
      const { IdAlmacenes, active } = entradas.find(
        (entra) => entra.id === IdEntrada
      );
      if (active) {
        const exist = acc.findIndex(
          (pro) => pro.id === IdProducto && pro.IdAlmacenes === IdAlmacenes
        );
        const producto = allProductos.find((pro) => pro.id === IdProducto);

        if (exist === -1)
          acc.push({
            ...producto,
            Cantidad: +Cantidad,
            IdAlmacenes: IdAlmacenes,
          });
        else {
          acc[exist] = {
            ...acc[exist],
            Cantidad: acc[exist].Cantidad + +Cantidad,
          };
        }
      }

      return acc;
    }, []);

    const total = ContadorEntradas.map((proEntrada) => {
      const { id: IdProducto, Cantidad, IdAlmacenes } = proEntrada;
      const producto = proSalidas.find((pro) => pro.IdProducto === IdProducto);
      if (!producto) return proEntrada;
      const { IdAlmacenes: almacen, active } = salidas.find(
        (sali) => sali.id === producto.IdSalida
      );
      if (!active) return proEntrada;
      return IdAlmacenes === almacen
        ? {
            ...proEntrada,
            Cantidad: Cantidad - producto.Cantidad,
          }
        : proEntrada;
    });
    // return total;

    const finalData = allProductos
      .filter((producto) => {
        const exist = total.some((pro) => pro.id === producto.id);
        return !exist;
      })
      .map((producto) => ({ ...producto, Cantidad: 0, IdAlmacenes }));

    const Final = [...total, ...finalData];
    return Final;
  }, [entradas, proEntradas, allProductos, salidas, proSalidas]);

  return ProductosActuales;
};
