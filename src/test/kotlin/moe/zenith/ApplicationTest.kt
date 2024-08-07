package moe.zenith

import io.ktor.server.testing.*
import kotlin.test.*
import moe.zenith.plugins.*

class ApplicationTest {
    @Test
    fun testRoot() = testApplication {
        application {
            configureResources()
        }
//        client.get("/").apply {
//            assertEquals(HttpStatusCode.OK, status)
//        }
    }
}
