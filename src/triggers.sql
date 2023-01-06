

DELIMITER // 
CREATE TRIGGER `insert_entrada` AFTER INSERT ON `detalle_entradas`
FOR EACH ROW BEGIN
UPDATE productos SET Stock = Stock + NEW.Cantidad
WHERE productos.id = NEW.IdProducto;
END;
//
DELIMITER ; 


DELIMITER // 
CREATE TRIGGER `delete_entrada` BEFORE DELETE ON `detalle_entradas`
FOR EACH ROW BEGIN
UPDATE productos 
JOIN detalle_entradas 
ON detalle_entradas.IdProducto  = OLD.id 
 and detalle_entradas.IdProducto = productos.id
set productos.Stock = productos.Stock - detalle_entradas.Cantidad
END;
//
DELIMITER ; 
