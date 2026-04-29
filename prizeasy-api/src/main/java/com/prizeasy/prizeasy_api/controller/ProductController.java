package com.prizeasy.prizeasy_api.controller;

import com.prizeasy.prizeasy_api.entity.Product;
import com.prizeasy.prizeasy_api.service.ProductService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@SecurityRequirement(name = "bearerAuth")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // GET ALL
    @GetMapping
    public List<Product> getAll() {
        return productService.getAllProducts();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Product getById(@PathVariable Integer id) {
        return productService.getProductById(id);
    }

    // CREATE
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Product create(@Valid @RequestBody Product product) {
        return productService.createProduct(product);
    }

    // UPDATE
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Product update(@PathVariable Integer id, @Valid @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    // DELETE
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        productService.deleteProduct(id);
    }
}