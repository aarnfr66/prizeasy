package com.prizeasy.prizeasy_api.service;

import com.prizeasy.prizeasy_api.entity.Product;
import com.prizeasy.prizeasy_api.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // GET ALL
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // GET BY ID
    public Product getProductById(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    // CREATE
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // UPDATE
    public Product updateProduct(Integer id, Product product) {
        Product existing = getProductById(id);

        existing.setName(product.getName());
        existing.setDescription(product.getDescription());
        existing.setPointsCost(product.getPointsCost());
        existing.setStock(product.getStock());
        existing.setImageUrl(product.getImageUrl());
        existing.setCategory(product.getCategory());
        existing.setActive(product.getActive());

        return productRepository.save(existing);
    }

    // DELETE
    public void deleteProduct(Integer id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}